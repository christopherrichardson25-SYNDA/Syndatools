import AppCard from "@/components/AppCard";
import APPS from "@/app/_data/apps";

export default async function ToolsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Tools Catalog</h1>
      <p className="text-sv-muted mt-2">
        Explore the applications connected to the Syndaverse. Each app can integrate with <b>SyndaBrain</b>.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AppCard
          name="VIBRAGRO"
          description="Environmental monitoring and plant health assessment system."
          icon="/icons/vibragro.svg"            // <— nuevo
          href="/tools/vibragro"                 // o la ruta que tengas
          online
        />
        <AppCard
          name="VIBRAMED"
          description="Vibrational quality, harmonic state and resonant mismatch in biological structures."
          icon="/icons/vibramed.svg"             // <— nuevo
          href="#"
          soon
        />
      </div>
    </div>
  );
}

