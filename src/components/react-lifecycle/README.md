## React Lifecycle:
componentDidMount():  Setara dengan useEffect(() => {}, []). Larik ketergantungan kosong [] memastikan bahwa efek hanya berjalan sekali, setelah render awal.

componentDidUpdate(): Setara dengan useEffect(() => {}, [value]). Efek akan dipicu setiap kali nilai ketergantungan berubah.

componentWillUnmount(): Setara dengan useEffect(()) => { return () => {} }, []). Fungsi pembersihan yang dikembalikan oleh efek akan dipanggil saat komponen dilepas.

render(): Digantikan oleh JSX yang dikembalikan oleh komponen fungsional itu sendiri.