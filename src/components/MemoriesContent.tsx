import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  isPlatform,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { add } from "ionicons/icons";
import React from "react";
import { Memory } from "../data/memories-context";
import FixedBottomFab from "./FixedBottomFab";
import MemoriesList from "./MemoriesList";
import ToolbarAction from "./ToolbarAction";

const MemoriesContent: React.FC<{
  title: string;
  fallbackText: string;
  memories: Memory[];
}> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.title}</IonTitle>
          {isPlatform("ios") && <ToolbarAction link="/new-memory" icon={add} />}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          {props.memories.length === 0 && (
            <IonRow>
              <IonCol className="ion-text-center">
                <h2>{props.fallbackText}</h2>
              </IonCol>
            </IonRow>
          )}
          <MemoriesList items={props.memories} />
        </IonGrid>
        {!isPlatform("ios") && <FixedBottomFab link="/new-memory" icon={add} />}
      </IonContent>
    </IonPage>
  );
};

export default MemoriesContent;
