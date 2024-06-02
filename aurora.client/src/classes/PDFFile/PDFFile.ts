class PDFFile {
    constructor() {
        this.state = {
            fileData: null
        };
    }

    static handleFileData(base64data: string | ArrayBuffer) {
        this.setState({ fileData: base64data });
    }
}
