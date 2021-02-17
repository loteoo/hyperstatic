interface LocationState {
  route?: string;
  path: string;
  params: any;
  query: any;
}

type PathStatus = 'iddle' | 'loading' | 'fetching' | 'ready' | 'error';

interface State {
  location: LocationState;
  paths: Record<string, PathStatus>;
  fastClicks: boolean;
  [x: string]: any;
}
