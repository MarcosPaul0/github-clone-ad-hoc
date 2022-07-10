export interface GroupProps {
  title: string;
}

export function GroupHead({ title }: GroupProps) {
  return (
    <h1 className={`w-full text-md flex items-center justify-center`}>
      {title}
    </h1>
  );
}