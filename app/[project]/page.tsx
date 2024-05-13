
export default function Page({ params }: { params: { project: number } }) {
  const {project} = params
  return <div>
    <Log/>
  </div>
}
