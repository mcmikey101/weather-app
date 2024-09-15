import '../styles/navbar.css'

export default function NavBar() {
    return (
        <>
            <div className='navbar'>
                <p className="time">Time</p>
                <p className="logo">Weza Reporto</p>
                <div className='nbminicont'>
                    <p className="language">Language</p>
                    <button className="systembtn">Metric</button>
                </div>
            </div>
        </>
    )
}