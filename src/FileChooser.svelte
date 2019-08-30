<script>        
    export let canvas = null;

    function fileSelected(e) {
        
        let img = document.querySelector('#preview');
        img.src = URL.createObjectURL(e.target.files[0]);
    }

    function fileLoaded(e) {
        
        let cnv = document.createElement('canvas');
        let img = document.querySelector('#preview');

        cnv.width = img.width;
        cnv.height = img.height;
        var ctx = cnv.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas = cnv;
    }

</script>

<input type="file" on:change={fileSelected}>
<figure>
  <img alt="[Preview]" id="preview" on:load={fileLoaded}>
  <figcaption>Preview</figcaption>
</figure>