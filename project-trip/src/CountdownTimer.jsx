
// const CountdownTimer = ({ endDate }) => {
//     const calculateTimeLeft = () => {
//         const difference = +new Date(endDate) - +new Date();
//         let timeLeft = {};

//         if (difference > 0) {
//             timeLeft = {
//                 days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//                 hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//                 minutes: Math.floor((difference / 1000 / 60) % 60),
//                 seconds: Math.floor((difference / 1000) % 60),
//             };
//         }

//         return timeLeft;
//     };

//     const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setTimeLeft(calculateTimeLeft());
//         }, 1000);

//         return () => clearTimeout(timer);
//     });

//     return (
//         <div>
//             {timeLeft.days > 0 && (
//                 <p>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s left</p>
//             )}
//             {timeLeft.days === 0 && timeLeft.hours > 0 && (
//                 <p>{timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s left</p>
//             )}
//             {timeLeft.days === 0 && timeLeft.hours === 0 && (
//                 <p>{timeLeft.minutes}m {timeLeft.seconds}s left</p>
//             )}
//             {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && (
//                 <p>{timeLeft.seconds}s left</p>
//             )}
//         </div>
//     );
// };

const CountdownTimer = ({ endDate }) => {
    const calculateTimeLeft = () => {
      const difference = +new Date(endDate) - +new Date();
      let timeLeft = {};
  
      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
  
      return timeLeft;
    };
  
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
  
      return () => clearTimeout(timer);
    });
  
    const timerComponents = [];
  
    Object.keys(timeLeft).forEach((interval) => {
      if (!timeLeft[interval]) {
        return;
      }
  
      timerComponents.push(
        <span key={interval}>
          {timeLeft[interval]} {interval}{" "}
        </span>
      );
    });
  
    return (
      <div>
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </div>
    );
  };
  
  