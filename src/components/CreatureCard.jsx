import creatureImg from "../assets/creature.PNG";

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

// Shows the creature image. It gets a little bigger at each stage. Swap this with the creature art later.
function Creature({ stage }) {
  const size = 100 + stage * 20; // 100px, 120px, 140px, 160px

  return (
    <img
      src={creatureImg}
      alt="Your creature"
      className="creature-img"
      style={{ width: size, height: size }}
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
