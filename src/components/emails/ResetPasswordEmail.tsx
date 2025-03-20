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

interface ResetPasswordEmailProps {
    username: string;
    resetUrl: string;
}

export const ResetPasswordEmail = ({ username, resetUrl }: ResetPasswordEmailProps) => (
    <Html>
        <Head />
        <Preview>Reset your TaskForge password</Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src="/public/window.svg"
                    width="120"
                    height="40"
                    alt="TaskForge"
                    style={logo}
                />
                <Heading style={h1}>Reset Your Password</Heading>
                <Text style={text}>Hi {username},</Text>
                <Text style={text}>
                    We received a request to reset your TaskForge account password.
                    Click the button below to choose a new password:
                </Text>
                <Section style={buttonContainer}>
                    <Button style={button} href={resetUrl}>
                        Reset Password
                    </Button>
                </Section>
                <Text style={text}>
                    If you didn&apos;t request this password reset, you can safely ignore this email.
                    Your password will remain unchanged.
                </Text>
                <Text style={text}>
                    For security reasons, this link will expire in 1 hour.
                </Text>
                <Hr style={hr} />
                <Text style={footer}>
                    Need help? Contact us at{" "}
                    <Link href="mailto:support@taskforge.com" style={link}>
                        support@taskforge.com
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
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "40px 20px",
    borderRadius: "8px",
    maxWidth: "600px",
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

export default ResetPasswordEmail;