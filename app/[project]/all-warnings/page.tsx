
export default function Page({ params }: { params: { project: number } }) {
  const {project} = params
  return <div>aa:{project}</div>
}
