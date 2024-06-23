import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur';

const Resources = {
    Bluerunner: new ImageSource('images/bluerunner1.png', { width: 256, height: 256, rows: 1, columns: 8 }),
    Bluerunnertwee: new ImageSource('images/bluerunner2.png', { width: 256, height: 256, rows: 1, columns: 8 }),
    Background: new ImageSource('images/background.png', { wrapping: ImageWrapping.Repeat}),
    Rock: new ImageSource('images/rock.png'),
    Zubat: new ImageSource('images/zubat.png')
};

const ResourceLoader = new Loader([
    Resources.Background,
    Resources.Bluerunner,
    Resources.Bluerunnertwee,
    Resources.Rock,
    Resources.Zubat
]);

export { Resources, ResourceLoader };
