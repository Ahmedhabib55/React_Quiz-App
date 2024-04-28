function FinsihedScrean({ points, totalPoints, highScore, dispatch }) {
  const precentage = (points / totalPoints) * 100;
  let emoji;
  if (precentage === 100) emoji = "🥇";
  if (precentage >= 80 && precentage < 100) emoji = "🎉";
  if (precentage >= 50 && precentage <= 80) emoji = "🙄";
  if (precentage >= 0 && precentage <= 50) emoji = "🙂";
  if (precentage === 0) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> your scored is {points} out of {totalPoints} (
        {Math.ceil(precentage)} )
      </p>
      <p className="highscore">(Highsore: {highScore} points)</p>
      <button onClick={() => dispatch({ type: "restart" })}>Restart</button>
    </>
  );
}

export default FinsihedScrean;
