import { createClient } from "@/lib/supabase/server";
import { AdminDashboard } from "@/components/admin-dashboard";

export default async function AdminPage() {
  const supabase = await createClient();

  // Authentication check disabled temporarily for preview
  // const { data: { user } } = await supabase.auth.getUser();
  // if (!user) { redirect("/auth/login"); }

  const { data: works } = await supabase
    .from("works")
    .select("*")
    .order("created_at", { ascending: false });

  return <AdminDashboard initialWorks={works || []} />;
}
