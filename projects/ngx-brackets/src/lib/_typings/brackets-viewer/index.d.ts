declare module 'brackets-viewer' {
    export interface BracketsViewer {
        // PROPERTIES
        partecipantRefs: Record<any, HTMLElement[]>;

        // ACCESSORS
        set onMatchClicked(callback: MatchClickCallback): void;

        // METHODS
        addLocale(name: string, locale: any): Promise<void>;
        render(data: ViewerData, config?: Partial<Config>): Promise<void>
        updateMatch(match: any): void;
        setParticipantImages(images: ParticipantImage[]): void
    }

    export interface ParticipantImage {
        participantId: number;
        imageUrl: string;
    }

    export interface ViewerData {
        stages: any[];
        matches: any[];
        matchGames: any[];
        participants: any[];
    }

    export interface Config {
        onMatchClick?: MatchClickCallback;
        onMatchLabelClick?: MatchClickCallback
        customRoundName?: ((...args) => undefined | string)
        selector?: string
        participantOriginPlacement?: Placement
        separatedChildCountLabel?: boolean
        showSlotsOrigin?: boolean
        showLowerBracketSlotsOrigin?: boolean
        showPopoverOnMatchLabelClick?: boolean
        highlightParticipantOnHover?: boolean
        showRankingTable?: boolean
        clear?: boolean
    }

    export type Placement = "none" | "before" | "after";

    export type MatchClickCallback = (match: MatchWithMetadata) => void;

    export interface MatchWithMetadata {
        metadata: {
            stageType: any;
            games: any[];
            label?: string;
            roundNumber?: number;
            roundCount?: number;
            matchLocation?: any;
            connectFinal?: boolean;
            connection?: any;
            originHint?: any;
        };
    }
}