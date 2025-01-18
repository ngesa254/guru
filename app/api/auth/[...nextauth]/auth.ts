import type { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";


export const authOptions: NextAuthOptions = {
        providers: [
          AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID!,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
            tenantId: process.env.AZURE_AD_TENANT_ID!,
            authorization: { params: { scope: "openid profile email offline_access" } },
          }),
        ],
        callbacks: {
          async jwt({ token, account }) {
            if (account) {
              token.idToken = account.id_token;
            }
            return token;
          },
        },
      };