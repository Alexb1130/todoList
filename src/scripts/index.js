import Model from './compontnts/model';
import View from './compontnts/view';
import Controller from './compontnts/controller';
import { load } from './compontnts/service';

const data = load();

const model = new Model(data.state);
const view = new View();

view.loadData(data.state);

const controller = new Controller(model, view);
