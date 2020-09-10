<template>
    <div>
        <section class="content">
            <div class="container-fluid">
                <div class="block-header">
                    <button class="btn btn-success" @click="handlePdf(false)">Preview Pdf</button>
                    <button class="btn btn-info m-l-10" @click="handlePdf(true)">Download Pdf</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    methods: {
        handlePdf(isDownload = false) {
            axios.get('pdf', {
                responseType: 'blob'
            }).then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data], {type: 'application/pdf'}));

                if (isDownload) {
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'file.pdf');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    window.open(url);
                }
            })
        }
    }
}
</script>
