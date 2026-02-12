import { RootLayout, metadata, handleServerFunctions } from "@payloadcms/next/layouts";
import { getPayload } from "payload";

import configPromise from "@/payload.config";

export { metadata };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const payload = await getPayload({ config: configPromise });
  const importMap = payload.importMap;

  const serverFunction = (args: { name: string; args: Record<string, unknown> }) =>
    handleServerFunctions({
      config: configPromise,
      importMap,
      ...args,
    });

  return (
    <RootLayout
      config={configPromise}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  );
}
