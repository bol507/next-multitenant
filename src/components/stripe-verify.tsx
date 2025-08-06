import { Button, Link } from "@payloadcms/ui";

export const StripeVerify = () => {
  return (
    <Link href="/stripe/verify" className="text-primary-500 hover:text-primary-600">
      <Button>Verify your account</Button>
    </Link>
  );
};