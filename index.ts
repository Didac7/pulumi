import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// 1. Obtener la AMI más reciente de Amazon Linux 2023
const ami = aws.ec2.getAmiOutput({
    mostRecent: true,
    owners: ["amazon"],
    filters: [
        {
            name: "name",
            values: ["al2023-ami-2023.*-x86_64"],
        },
        {
            name: "virtualization-type",
            values: ["hvm"],
        },
    ],
});

// 2. Crear Grupo de Seguridad (Security Group) para permitir SSH (22) y HTTP (80)
const secGroup = new aws.ec2.SecurityGroup("vm-security-group", {
    description: "Permitir trafico entrante SSH y HTTP",
    ingress: [
        {
            protocol: "tcp",
            fromPort: 22,
            toPort: 22,
            cidrBlocks: ["0.0.0.0/0"],
            description: "Acceso SSH",
        },
        {
            protocol: "tcp",
            fromPort: 80,
            toPort: 80,
            cidrBlocks: ["0.0.0.0/0"],
            description: "Acceso Web HTTP",
        },
    ],
    egress: [
        {
            protocol: "-1",
            fromPort: 0,
            toPort: 0,
            cidrBlocks: ["0.0.0.0/0"],
            description: "Permitir todo el trafico de salida",
        },
    ],
    tags: {
        Name: "pulumi-vm-sg",
        ManagedBy: "Pulumi",
    },
});

// 3. Script de inicio (User Data) para instalar servidor web y página de bienvenida
const userData = `#!/bin/bash
dnf update -y
dnf install -y httpd
systemctl start httpd
systemctl enable httpd
cat <<EOF > /var/www/html/index.html
<!DOCTYPE html>
<html>
<head>
    <title>VM Desplegada con Pulumi</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f172a; color: #f8fafc; text-align: center; padding-top: 80px; }
        .card { background: #1e293b; border-radius: 12px; padding: 40px; display: inline-block; box-shadow: 0 10px 25px rgba(0,0,0,0.5); border: 1px solid #334155; }
        h1 { color: #38bdf8; margin-bottom: 10px; }
        p { color: #94a3b8; font-size: 1.1rem; }
        .badge { background: #0284c7; color: white; padding: 6px 14px; border-radius: 20px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="card">
        <h1>¡HOLA MUNDO STACKOVERFLOW!</h1>
        <p>Sistema Operativo: <span class="badge">Manzana</span></p>
        <p>Infraestructura como Código administrada mediante <strong>Pulumi & TypeScript</strong>.</p>
    </div>
</body>
</html>
EOF
`;

// 4. Crear la Instancia EC2
const server = new aws.ec2.Instance("pulumi-web-vm", {
    instanceType: "t3.micro",
    ami: ami.id,
    vpcSecurityGroupIds: [secGroup.id],
    userData: userData,
    userDataReplaceOnChange: true,
    tags: {
        Name: "Pulumi-AmazonLinux2023-VM",
        Environment: "Dev",
        ManagedBy: "Pulumi",
    },
});

// 5. Exportar valores útiles para conectar e interactuar
export const instanceId = server.id;
export const publicIp = server.publicIp;
export const publicDns = server.publicDns;
export const webUrl = pulumi.interpolate`http://${server.publicIp}`;
