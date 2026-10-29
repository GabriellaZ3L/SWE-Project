import stage1 from "../assets/creature stage 1.png";
import stage2 from "../assets/creature stage 2.png";
import stage3 from "../assets/creature stage 3.png";

// One picture per stage, in order. Add more here if you draw more stages.
const creatureImages = [stage1, stage2, stage3];

// Shows the student's creature and how close it is to leveling up.
// Find which stage the student is on, based on points.
// Might need to readjust the stages if we change the points required for each stage.
// This is just a template.
function getStageIndex(points, stages) {
  let index = 0;
  stages.forEach((stage, i) => {
    if (points >= stage.minPoints) index = i;
  });
  return index;
}

// COMMENTED OUT FOR NOW. THIS ONLY SHOWS ONE CREATURE IMAGE WITH NO STAGES. WE HAVE STAGES NOW.
// // Shows only one creature image. It gets a little bigger at each stage. Swap this with the creature art later.
// function Creature({ stage }) {
//   const size = 100 + stage * 20; // 100px, 120px, 140px, 160px

//   return (
//     <img
//       src={creatureImg}
//       alt="Your creature"
//       className="creature-img"
//       style={{ width: size, height: size }}
//     />
//   );
// }

// Shows the picture for the student's current stage.
function Creature({ stage }) {
  // If there are more stages than pictures, keep showing the last picture
  const src = creatureImages[Math.min(stage, creatureImages.length - 1)];

  return (
    <img
      src={src}
      alt={`Your creature at stage ${stage + 1}`}
      className="creature-img"
      style={{ width: 160, height: 160 }}
    />
  );
}

export default function CreatureCard({ points, stages }) {
  const index = getStageIndex(points, stages);
  const current = stages[index];
  const next = stages[index + 1]; // undefined if already at the last stage

  // How far (0 to 100%) between this stage and the next one.
  const percent = next
    ? Math.round(((points - current.minPoints) / (next.minPoints - current.minPoints)) * 100)
    : 100;

  return (
    <div className="card creature-card">
      <div className="card-header">
        <h2>Your creature</h2>
        <span className="stage-tag">{current.name}</span>
      </div>

      <div className="creature-stage">
        <Creature stage={index} />
      </div>

      <div className="progress" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <p className="progress-text">
        {next
          ? `${next.minPoints - points} points until it grows into a ${next.name}`
          : "Fully grown! Keep it up."}
      </p>
    </div>
  );
}
