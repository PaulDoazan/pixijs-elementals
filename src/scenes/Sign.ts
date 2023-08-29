export class Sign {
    private htmlTagSign: HTMLDivElement | null;
    private contentA: number;
    private contentB: number;
    private result: number;

    constructor() {
        this.contentA = 0;
        this.contentB = 0;
        this.result = 0;
        this.htmlTagSign = document.querySelector('#sign-content');
        if (this.htmlTagSign) this.refresh();
    }

    public check(value: number) {
        if (value === this.contentA + this.contentB) {
            if (this.htmlTagSign) {
                this.htmlTagSign.textContent = `${this.contentA} + ${this.contentB} = ${value}`
                this.htmlTagSign.style.color = "green"
                setTimeout(() => {
                    this.refresh()
                    if (this.htmlTagSign) this.htmlTagSign.style.color = "black"
                }, 2000)
                return true;
            }
        } else {
            if (this.htmlTagSign) {
                this.htmlTagSign.textContent = `${this.contentA} + ${this.contentB} ≠ ${value}`
                this.htmlTagSign.style.color = "red"
            }
        }
        return false;
    }

    public refresh() {

        this.result = this.getRandomIntInclusive(0, 9)
        this.contentA = this.getRandomIntInclusive(0, this.result)
        this.contentB = this.result - this.contentA
        if (this.htmlTagSign) {
            this.htmlTagSign.style.display = 'block'
            this.htmlTagSign.textContent = `${this.contentA} + ${this.contentB} = ?`
        }
    }

    private getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

