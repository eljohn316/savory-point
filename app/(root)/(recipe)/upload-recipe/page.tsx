import { UploadRecipeForm } from './upload-recipe-form';

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-emerald-700">Upload recipe</h1>
      <UploadRecipeForm />;
    </div>
  );
}
