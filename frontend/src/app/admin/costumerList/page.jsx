import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Table from "../components/Table";
import styles from "../styles/costumerList.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminDashboard() {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className={styles.content}>
                <Header />
                <Table />
            </div>
        </div>
    );
}
