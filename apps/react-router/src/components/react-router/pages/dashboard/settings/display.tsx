import { Link } from 'react-router-dom'

function Page() {
    return (
        <div>
            Settings - Display Page {' '}

            <Link to={'/dashboard/settings/information/1'}>Go to information/:userId</Link>
        </div>
    )
}

export default Page