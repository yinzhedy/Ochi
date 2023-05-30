export default function CollectPlayerPosition(playerPositionX, playerPositionY) {
    console.log(playerPositionX +'collecting position')
    console.log(playerPositionY)
    return (
    
        <div className="player-position-tracker">
            <div>HP:</div>
            <div>{playerPositionX} + 'y:' + {playerPositionY}</div>
        </div>
    )
}