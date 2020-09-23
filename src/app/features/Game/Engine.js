// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!stockfish/src/stockfish.asm.js'

const HASH_SIZE = 32
const DEPTH = 12

//const stockfish = new Worker()

let stockfish

export const initEngine = skillLevel => {
    stockfish = new Worker()
    stockfish.postMessage(`setoption name hash value ${HASH_SIZE}`)
    stockfish.postMessage(`setoption name skill level value ${skillLevel}`)
}

export const getBestMove = (position, callback) => {
    stockfish.postMessage(`position fen ${position}`)
    stockfish.postMessage(`go depth ${DEPTH}`)

    stockfish.onmessage = message => {
        const messageWords = message.data.split(' ')
        if (messageWords[0] === 'bestmove') {            
            callback(messageWords[1])
        }
    }
}

//export const getAnalysis = (moves, depth) => {
//    let movesString = ''
//    let index = 0
//    let analysis = []
//    let moveAnalysis = {}

//    let analyseBest = true

//    stockfish.postMessage('position startpos')

//    stockfish.onmessage = message => {
//        if (message.data.beginsWith(`info depth ${depth}`)) {
//            const fields = message.data.split(' ')

//            const bestMove = fields[fields.indexOf('pv') + 1]
//            const forcedMate = fields[fields.indexOf('score') + 1] === 'mate'
//            const score = fields[fields.indexOf('score') + 2]

//            if (analyseBest) {
//                moveAnalysis['bestMoveScore'] = score
//                moveAnalysis['bestMoveForcedMate'] = forcedMate
//            } else {
//                moveAnalysis['userMoveScore'] = score
//                moveAnalysis['userMoveForcedMate'] = forcedMate
//                analysis.push(moveAnalysis)
//                index++
//                moveAnalysis = { bestMove, userMove: moves[index] }
//            }

//            analyseBest = !analyseBest

//            if (index === moves.length) {
//                return analysis
//            }

//            if (analyseBest) {
//                stockfish.postMessage(`position startpos moves ${movesString + ' ' + bestMove}`)
//                stockfish.postMessage(`go depth ${depth}`)
//            } else {
//                movesString += moves[index]
//                stockfish.postMessage(`position startpos moves ${movesString}`)
//                stockfish.postMessage(`go depth ${depth}`)
//            }
//        }
//    }
//}