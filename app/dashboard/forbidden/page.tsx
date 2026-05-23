export default function ForbiddenPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold">
          403
        </h1>

        <p className="mt-3 text-muted-foreground">
          You do not have permission
          to access this page.
        </p>
      </div>
    </div>
  );
}