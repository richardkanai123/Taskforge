import {
    Html,
    Button,
    Container,
    Head,
    Hr,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Body,
    Heading,
} from "@react-email/components";

interface VerifyEmailProps {
    username: string;
    verificationUrl: string;
}

export const VerifyEmail = ({ username, verificationUrl }: VerifyEmailProps) => (
    <Html>
        <Head />
        <Preview>Verify your TaskForge email address</Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src="/public/window.svg"
                    width="120"
                    height="40"
                    alt="TaskForge"
                    style={logo}
                />
                <Heading style={h1}>Verify Your Email</Heading>
                <Text style={text}>Hi {username},</Text>
                <Text style={text}>
                    Thanks for signing up for TaskForge! We just need to verify your email
                    address to complete your account setup. Please click the button below:
                </Text>
                <Section style={buttonContainer}>
                    <Button style={button} href={verificationUrl}>
                        Verify Email Address
                    </Button>
                </Section>
                <Text style={text}>
                    This verification link will expire in 24 hours. If you didn&apos;t create
                    a TaskForge account, you can safely ignore this email.
                </Text>
                <Hr style={hr} />
                <Text style={footer}>
                    If you&apos;re having trouble clicking the button, copy and paste this URL
                    into your web browser:{" "}
                    <Link href={verificationUrl} style={link}>
                        {verificationUrl}
                    </Link>
                </Text>
                <Text style={footer}>
                    Need help?{" "}
                    <Link href="mailto:support@taskforge.com" style={link}>
                        Contact our support team
                    </Link>
                </Text>
            </Container>
        </Body>
    </Html>
);

const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
    padding: "40px 0",
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "40px 20px",
    borderRadius: "8px",
    maxWidth: "600px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const logo = {
    margin: "0 auto",
    marginBottom: "24px",
};

const h1 = {
    color: "#1d1c1d",
    fontSize: "24px",
    fontWeight: "700",
    margin: "30px 0",
    padding: "0",
    textAlign: "center" as const,
};

const text = {
    color: "#4a4a4a",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "16px 0",
};

const buttonContainer = {
    textAlign: "center" as const,
    margin: "32px 0",
};

const button = {
    backgroundColor: "#00206c",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "500",
    padding: "12px 32px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block",
    marginTop: "24px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 150ms ease-in-out",
    "&:hover": {
        backgroundColor: "#1E293B",
    },
};

const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
};

const footer = {
    color: "#9ca3af",
    fontSize: "14px",
    lineHeight: "24px",
    margin: "12px 0",
    textAlign: "center" as const,
};

const link = {
    color: "#3b82f6",
    textDecoration: "underline",
};

export default VerifyEmail;