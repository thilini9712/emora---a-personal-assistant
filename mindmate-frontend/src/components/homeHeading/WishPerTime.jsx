import "./HomeHeading.css"

const WishPerTime = (props) => {

    let myDate = new Date();
    let hrs = myDate.getHours();

    let greet;

    if (hrs < 12)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';
    return (
        <div className='geet'>
            <span className="name-subtitle">
                Hi Mihiri !
                <br/>
                {greet}
            </span>


        </div>
    );
}

export default WishPerTime;