import CollectMonsterPosition from "./collect-monster-position";
import CollectPlayerPosition from "./collect-player-position";

export default async function ComarePositions(x, y) { 
    const monsterPosition = CollectMonsterPosition();
    console.log(monsterPosition);
    console.log(x, y);
    // CollectMonsterPosition().then((monsterx, monstery) => {
    //     console.log(x, y);
    //     console.log(monsterx, monstery)
    // })
}