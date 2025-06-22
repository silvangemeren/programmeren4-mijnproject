import { ImageSource, Loader, ImageWrapping } from 'excalibur';

const Resources = {
    Bluerunner: new ImageSource('images/bluerunner1.png'),
    Bluerunnertwee: new ImageSource('images/bluerunneranimation.png'),
    Background: new ImageSource('images/background.png', { wrapping: ImageWrapping.Repeat }),
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