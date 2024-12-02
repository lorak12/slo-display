import MediaForm from "./MediaForm";
import { getMediaById } from "@/actions/mediaActions";

type Params = Promise<{ mediaId: string }>;
export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const data = await getMediaById(params.mediaId);
  return (
    <div>
      <MediaForm initialData={data as any} />
    </div>
  );
}
