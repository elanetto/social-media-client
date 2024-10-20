import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import { configure } from 'cypress-image-snapshot/configure';

addMatchImageSnapshotCommand();
configure({ capture: 'fullPage' });