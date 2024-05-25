export function SelectedInfo({
  item,
}: {
  item: { id: string; name: string } | null;
}) {
  return (
    <div>
      <div className="flex gap-x-2">
        <p className="text-sm text-muted-foreground">ID:</p>
        <p className="text-sm text-foreground">{!!item ? item.id : "none"}</p>
      </div>
      <div className="flex gap-x-2">
        <p className="text-sm text-muted-foreground">Name:</p>
        <p className="text-sm text-foreground">{!!item ? item.name : "none"}</p>
      </div>
    </div>
  );
}
