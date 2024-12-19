




export default function NewPasswordPage() {
    return (
        <div className="mx-auto max-w-xl border shadow-md shadow-gray-300 p-4 rounded-xl mt-32">
            <h1 className="text-2xl text-center">Change Password</h1>
            <form className="p-2">
                <div className="mt-3">
                    <label className = "text-gray-500" >Enter new password</label>
                    <input type="password" required placeholder=""/>
                </div>
                <div className="mt-3">
                    <label className = "text-gray-500">Confirm new password</label>
                    <input type="password"  required />
                </div>
                <button className="primary">Change Password</button>
            </form>
        </div>
    );
}