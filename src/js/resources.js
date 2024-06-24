import { Resource, ImageSource, Loader, ImageWrapping } from 'excalibur';


const Resources = {
    Bluerunnerspritesheet: new ImageSource('images/bluerunnerspritesheet.png', {
        width: 256,
        height: 256,
        rows: 1,
        columns: 2
    }),
    Background: new ImageSource('images/background.png', { wrapping: ImageWrapping.Repeat }),
    Rock: new ImageSource('images/rock.png'),
    Zubat: new ImageSource('images/zubat.png')
};

const ResourceLoader = new Loader([
    Resources.Bluerunnerspritesheet,
    Resources.Background,
    Resources.Rock,
    Resources.Zubat
]);

export { Resources, ResourceLoader };
