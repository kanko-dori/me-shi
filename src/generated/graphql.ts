import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddCommentInput = {
  comment: Scalars['String'];
  teamId: Scalars['String'];
};

export type AddNamecardInput = {
  namecardId: Scalars['ID'];
};

export type AddNamecardResult = {
  __typename?: 'AddNamecardResult';
  getterNamecardId?: Maybe<Scalars['String']>;
  ownerNamecardId?: Maybe<Scalars['String']>;
};

export type Affiliation = {
  __typename?: 'Affiliation';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  body?: Maybe<Scalars['String']>;
  commenterId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type CreateEventInput = {
  name: Scalars['String'];
};

export type CreateNamecardInput = {
  affiliation?: Maybe<Scalars['String']>;
  eventId: Scalars['ID'];
  preferTechnologies?: Maybe<Array<Scalars['String']>>;
  teamId: Scalars['ID'];
  usedTechnologies?: Maybe<Array<Scalars['String']>>;
};

export type CreateTeamInput = {
  eventId: Scalars['String'];
  name: Scalars['String'];
  product: ProductInput;
};

export type CreateUserInput = {
  githubId: Scalars['String'];
  iconURL: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
};

export type DeleteUserInput = {
  userid: Scalars['ID'];
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type GetNamecardInput = {
  namecardId: Scalars['ID'];
};

export type GetUserInput = {
  userId: Scalars['ID'];
};

export type GetZukanInput = {
  eventId: Scalars['ID'];
};

export type ListTeamInput = {
  eventId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Team;
  addNamecard: AddNamecardResult;
  createEvent: Event;
  createNamecard: Namecard;
  createTeam: Team;
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
};


export type MutationAddCommentArgs = {
  input?: Maybe<AddCommentInput>;
};


export type MutationAddNamecardArgs = {
  namecardId: Scalars['String'];
};


export type MutationCreateEventArgs = {
  input?: Maybe<CreateEventInput>;
};


export type MutationCreateNamecardArgs = {
  input?: Maybe<CreateNamecardInput>;
};


export type MutationCreateTeamArgs = {
  input?: Maybe<CreateTeamInput>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Namecard = {
  __typename?: 'Namecard';
  event: Event;
  id: Scalars['ID'];
  memberOf?: Maybe<Scalars['String']>;
  owner: User;
  preferTechnologies?: Maybe<Array<Scalars['String']>>;
  team: Team;
  usedTechnologies?: Maybe<Array<Scalars['String']>>;
};

export type Product = {
  __typename?: 'Product';
  comments?: Maybe<Array<Comment>>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  repository?: Maybe<Scalars['String']>;
};

export type ProductInput = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  repository?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getNamecard?: Maybe<Namecard>;
  getUser?: Maybe<User>;
  getZukan?: Maybe<Zukan>;
  listAffiliation?: Maybe<Array<Maybe<Affiliation>>>;
  listEvent?: Maybe<Array<Maybe<Event>>>;
  listTeam?: Maybe<Array<Maybe<Team>>>;
  listTeamAll?: Maybe<Array<Maybe<Team>>>;
  listTechnology?: Maybe<Array<Maybe<Technology>>>;
};


export type QueryGetNamecardArgs = {
  input?: Maybe<GetNamecardInput>;
};


export type QueryGetUserArgs = {
  input?: Maybe<GetUserInput>;
};


export type QueryGetZukanArgs = {
  input?: Maybe<GetZukanInput>;
};


export type QueryListTeamArgs = {
  input?: Maybe<ListTeamInput>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onAddNamecard?: Maybe<AddNamecardResult>;
};


export type SubscriptionOnAddNamecardArgs = {
  ownerNamecardId?: Maybe<Scalars['String']>;
};

export type Team = {
  __typename?: 'Team';
  event: Event;
  id: Scalars['ID'];
  name: Scalars['String'];
  product: Product;
};

export type Technology = {
  __typename?: 'Technology';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateUserInput = {
  githubId?: Maybe<Scalars['String']>;
  iconURL?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  githubId?: Maybe<Scalars['String']>;
  givenNamecards?: Maybe<Array<Namecard>>;
  iconURL?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  myNamecards?: Maybe<Array<Namecard>>;
  name?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
};

export type Zukan = {
  __typename?: 'Zukan';
  event: Event;
  namecards?: Maybe<Array<ZukanNamecard>>;
};

export type ZukanNamecard = {
  __typename?: 'ZukanNamecard';
  event: Event;
  id: Scalars['ID'];
  isOwn?: Maybe<Scalars['Boolean']>;
  memberOf?: Maybe<Scalars['String']>;
  owner: User;
  preferTechnologies?: Maybe<Array<Scalars['String']>>;
  team: Team;
  usedTechnologies?: Maybe<Array<Scalars['String']>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddCommentInput: AddCommentInput;
  AddNamecardInput: AddNamecardInput;
  AddNamecardResult: ResolverTypeWrapper<AddNamecardResult>;
  Affiliation: ResolverTypeWrapper<Affiliation>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  CreateEventInput: CreateEventInput;
  CreateNamecardInput: CreateNamecardInput;
  CreateTeamInput: CreateTeamInput;
  CreateUserInput: CreateUserInput;
  DeleteUserInput: DeleteUserInput;
  Event: ResolverTypeWrapper<Event>;
  GetNamecardInput: GetNamecardInput;
  GetUserInput: GetUserInput;
  GetZukanInput: GetZukanInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  ListTeamInput: ListTeamInput;
  Mutation: ResolverTypeWrapper<{}>;
  Namecard: ResolverTypeWrapper<Namecard>;
  Product: ResolverTypeWrapper<Product>;
  ProductInput: ProductInput;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Team: ResolverTypeWrapper<Team>;
  Technology: ResolverTypeWrapper<Technology>;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  Zukan: ResolverTypeWrapper<Zukan>;
  ZukanNamecard: ResolverTypeWrapper<ZukanNamecard>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddCommentInput: AddCommentInput;
  AddNamecardInput: AddNamecardInput;
  AddNamecardResult: AddNamecardResult;
  Affiliation: Affiliation;
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  CreateEventInput: CreateEventInput;
  CreateNamecardInput: CreateNamecardInput;
  CreateTeamInput: CreateTeamInput;
  CreateUserInput: CreateUserInput;
  DeleteUserInput: DeleteUserInput;
  Event: Event;
  GetNamecardInput: GetNamecardInput;
  GetUserInput: GetUserInput;
  GetZukanInput: GetZukanInput;
  ID: Scalars['ID'];
  ListTeamInput: ListTeamInput;
  Mutation: {};
  Namecard: Namecard;
  Product: Product;
  ProductInput: ProductInput;
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  Team: Team;
  Technology: Technology;
  UpdateUserInput: UpdateUserInput;
  User: User;
  Zukan: Zukan;
  ZukanNamecard: ZukanNamecard;
};

export type AddNamecardResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddNamecardResult'] = ResolversParentTypes['AddNamecardResult']> = {
  getterNamecardId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ownerNamecardId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AffiliationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Affiliation'] = ResolversParentTypes['Affiliation']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  commenterId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addComment?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationAddCommentArgs, never>>;
  addNamecard?: Resolver<ResolversTypes['AddNamecardResult'], ParentType, ContextType, RequireFields<MutationAddNamecardArgs, 'namecardId'>>;
  createEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<MutationCreateEventArgs, never>>;
  createNamecard?: Resolver<ResolversTypes['Namecard'], ParentType, ContextType, RequireFields<MutationCreateNamecardArgs, never>>;
  createTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationCreateTeamArgs, never>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
};

export type NamecardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Namecard'] = ResolversParentTypes['Namecard']> = {
  event?: Resolver<ResolversTypes['Event'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  memberOf?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  preferTechnologies?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  team?: Resolver<ResolversTypes['Team'], ParentType, ContextType>;
  usedTechnologies?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  repository?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getNamecard?: Resolver<Maybe<ResolversTypes['Namecard']>, ParentType, ContextType, RequireFields<QueryGetNamecardArgs, never>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, never>>;
  getZukan?: Resolver<Maybe<ResolversTypes['Zukan']>, ParentType, ContextType, RequireFields<QueryGetZukanArgs, never>>;
  listAffiliation?: Resolver<Maybe<Array<Maybe<ResolversTypes['Affiliation']>>>, ParentType, ContextType>;
  listEvent?: Resolver<Maybe<Array<Maybe<ResolversTypes['Event']>>>, ParentType, ContextType>;
  listTeam?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType, RequireFields<QueryListTeamArgs, never>>;
  listTeamAll?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType>;
  listTechnology?: Resolver<Maybe<Array<Maybe<ResolversTypes['Technology']>>>, ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  onAddNamecard?: SubscriptionResolver<Maybe<ResolversTypes['AddNamecardResult']>, "onAddNamecard", ParentType, ContextType, RequireFields<SubscriptionOnAddNamecardArgs, never>>;
};

export type TeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  event?: Resolver<ResolversTypes['Event'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TechnologyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Technology'] = ResolversParentTypes['Technology']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  githubId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  givenNamecards?: Resolver<Maybe<Array<ResolversTypes['Namecard']>>, ParentType, ContextType>;
  iconURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  myNamecards?: Resolver<Maybe<Array<ResolversTypes['Namecard']>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitterId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ZukanResolvers<ContextType = any, ParentType extends ResolversParentTypes['Zukan'] = ResolversParentTypes['Zukan']> = {
  event?: Resolver<ResolversTypes['Event'], ParentType, ContextType>;
  namecards?: Resolver<Maybe<Array<ResolversTypes['ZukanNamecard']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ZukanNamecardResolvers<ContextType = any, ParentType extends ResolversParentTypes['ZukanNamecard'] = ResolversParentTypes['ZukanNamecard']> = {
  event?: Resolver<ResolversTypes['Event'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isOwn?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  memberOf?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  preferTechnologies?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  team?: Resolver<ResolversTypes['Team'], ParentType, ContextType>;
  usedTechnologies?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AddNamecardResult?: AddNamecardResultResolvers<ContextType>;
  Affiliation?: AffiliationResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Namecard?: NamecardResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  Technology?: TechnologyResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Zukan?: ZukanResolvers<ContextType>;
  ZukanNamecard?: ZukanNamecardResolvers<ContextType>;
};

