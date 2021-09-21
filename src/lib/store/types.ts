export interface Loading {
	type: 'loading';
}

export interface Success<T> {
	type: 'success';
	value: T;
}

export interface Failure<U> {
	type: 'failure';
	error: U;
}

export type StatusStore<T, U> = Loading | Success<T> | Failure<U>;
