import AdminMain from "./AdminMain";
import AdimnSidebar from "./AdminSidebar";
import "./admin.css"
const AdminDashboard = () => {
    return (
        <section className="admin-dashboard">

            <AdimnSidebar />
            <AdminMain />
        </section>
    );
}

export default AdminDashboard;