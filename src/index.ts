import crypto from "crypto";

//여러개의 블록이 사슬처럼 묶인 것 = 블록체인, 區塊鏈
//블록 안에 데이터가 들어있음
//블록체인으로 보호하고 싶은 데이터
//해당 블록은 다른 블록에 묶여있음
//사슬처럼 연결됨 (해쉬 값으로 연결고리가 구성됨)
interface BlockShape {
	hash: string;
	prevHash:string;
	height:number;
	data:string;
}


//블록의 hash값은 prevHash, height, data 값을 이용해 계산됨
//해쉬 = 그 블록의 고유 서명
//해쉬의 장점 : 데이터가 변하지 않으면 해쉬값도 변하지 않음
// -> 블록체인에서 블록을 보호하는 방법, 해쉬값이 변하지 않았음 = 블록 정보가 수정되지 않았음

class Block implements BlockShape {
	public hash: string;

	constructor(
		public prevHash: string,
		public height: number,
		public data: string,
	) {
		//hash 초기화
		//static? -> 클래스 인스턴스가 없어도 부를 수 있는 함수
		this.hash = Block.calculateHash(prevHash, height, data);
	}

	static calculateHash(prevHash: string, height: number, data: string) {
			const toHash= `${prevHash}${height}${data}`;
			return crypto.createHash("sha256").update(toHash).digest("hex");
	}
}

class Blockchain {
	private blocks: Block[];
	constructor() {
		this.blocks = [];
	}
	private getPrevHash() {
		if(this.blocks.length === 0) return "";
		return this.blocks[this.blocks.length - 1].hash;
	}
	public addBlock(data:string) {
		const newBlock = new Block(this.getPrevHash(), this.blocks.length+1, data
		);
		this.blocks.push(newBlock);
	}
	public getBlocks() {
		//새 배열을 반환하니 누가 블록을 수정하더라도 안전함
		return [...this.blocks];
	}
}
const blockchain = new Blockchain();
blockchain.addBlock("첫번째");
blockchain.addBlock("두번째");
blockchain.addBlock("세번째");
blockchain.getBlocks().push(new Block("잼민이가 해킹함", 100000, "ㅋㅋ쉽누"))
console.log(blockchain.getBlocks());