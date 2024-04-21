import { useRef, useState } from "react";

// export default function App() {
//   const [count1, setCount1] = useState(1);
//   const [count2, setCount2] = useState(count1 + 1);

//   useEffect(() => {
//     console.log("useEffect");
//     setCount2((prev) => prev + count1);
//   }, [count1]);

//   console.log({ count1, count2 });

//   return (
//     <button
//       onClick={() => {
//         setCount1(count2 + 1);
//       }}
//     >
//       {count2 / count1}
//     </button>
//   );
// }

export default function App() {
  const [count, setCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const intervalRef = useRef<number | undefined>();
  const previousCountRef = useRef<number | undefined>();

  // useEffect(() => {
  //   previousCountRef.current = count;
  // }, [count]);

  const startCounting = () => {
    setIsCounting(true);

    intervalRef.current = setInterval(() => {
      setCount((prevCount) => {
        previousCountRef.current = prevCount;
        return prevCount + 1;
      });
    }, 1000);
  };

  const stopCounting = () => {
    setIsCounting(false);
    clearInterval(intervalRef.current);
  };

  const resetCount = () => {
    setCount(0);
    setIsCounting(false);
    clearInterval(intervalRef.current);
  };

  console.log({ count, ref: previousCountRef.current });

  return (
    <div>
      <p>Current Count: {count}</p>
      <p>Previous Count: {previousCountRef.current}</p>
      <p>Status: {isCounting ? "Counting" : "Stopped"}</p>
      <button onClick={isCounting ? stopCounting : startCounting}>
        {isCounting ? "Stop Counting" : "Start Counting"}
      </button>
      <button onClick={resetCount}>Reset Count</button>
    </div>
  );
}

// export default function App() {
//   const [count, setCount] = useState(0);

//   const handleClickButton = () => {
//     setInterval(() => {
//       console.log("interval func ", { count });
//       setCount(count + 1);
//     }, 1000);
//   };

//   console.log("Component ", { count });

//   return <button onClick={handleClickButton}>{count}</button>;
// }
