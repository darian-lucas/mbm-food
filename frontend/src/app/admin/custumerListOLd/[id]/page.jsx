// pages/userList/[id]/page.jsx
import { useRouter } from 'next/router';
import userService from '../../services/userService'; // Đảm bảo đường dẫn đúng

export async function getServerSideProps({ params }) {
    const { id } = params;

    // Lấy thông tin người dùng từ API theo ID
    const userData = await userService.getUserById(id);

    return {
        props: {
            userData,
        },
    };
}

export default function UserDetail({ userData }) {
    const router = useRouter();

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Details</h1>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Address:</strong> {userData.address}</p>
            <p><strong>Role:</strong> {userData.role}</p>
            <p><strong>Join Date:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
        </div>
    );
}
