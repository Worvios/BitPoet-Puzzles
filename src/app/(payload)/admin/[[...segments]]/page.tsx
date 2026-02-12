import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { getPayload } from "payload";

import configPromise from "@/payload.config";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params?: Promise<{ segments?: string[] }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return generatePageMetadata({
    config: configPromise,
    params: params ?? Promise.resolve({}),
    searchParams: searchParams ?? Promise.resolve({}),
  });
}

export default async function AdminPage({
  params,
  searchParams,
}: {
  params?: Promise<{ segments?: string[] }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const payload = await getPayload({ config: configPromise });
  const importMap = payload.importMap;
  const resolvedParams = (await (params ?? Promise.resolve({}))) as {
    segments?: string[];
  };

  return (
    <RootPage
      config={configPromise}
      importMap={importMap}
      params={Promise.resolve({ segments: resolvedParams.segments ?? [] })}
      searchParams={searchParams ?? Promise.resolve({})}
    />
  );
}
