import React, { useContext, useEffect } from "react";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonSpinner,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import { happy, sad } from "ionicons/icons";

/* Page Imports */
import GoodMemories from "./pages/GoodMemories";
import BadMemories from "./pages/BadMemories";

import MemoriesContext from "./data/memories-context";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/theme.css";

const NewMemory = React.lazy(() => import("./pages/NewMemory"));

const App: React.FC = () => {
  const memoriesCtx = useContext(MemoriesContext);
  const { initContext } = memoriesCtx;

  useEffect(() => {
    initContext();
  }, [initContext]);

  return (
    <IonApp>
      <IonReactRouter>
        <React.Suspense fallback={<IonSpinner />}>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/good-memories">
                <GoodMemories />
              </Route>
              <Route path="/bad-memories">
                <BadMemories />
              </Route>
              <Route path="/new-memory">
                <NewMemory />
              </Route>
              <Redirect to="/good-memories" />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton href="/good-memories" tab="good">
                <IonIcon icon={happy} />
                <IonLabel>Good Memories</IonLabel>
              </IonTabButton>
              <IonTabButton href="/bad-memories" tab="bad">
                <IonIcon icon={sad} />
                <IonLabel>Bad Memories</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </React.Suspense>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
