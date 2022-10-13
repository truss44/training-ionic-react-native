import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import React from "react";

const FixedBottomFab: React.FC<{ link: string; icon: string }> = (props) => {
  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton routerLink={props.link}>
        <IonIcon icon={props.icon} />
      </IonFabButton>
    </IonFab>
  );
};

export default FixedBottomFab;
