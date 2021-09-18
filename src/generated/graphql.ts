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

export type CreateNamecardInput = {
  affiliation?: Maybe<Scalars['String']>;
  eventId: Scalars['ID'];
  preferTechnologies?: Maybe<Array<Scalars['String']>>;
  teamId: Scalars['ID'];
  usedTechnologies?: Maybe<Array<Scalars['String']>>;
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

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Comment;
  addNamecard: User;
  createEvent: Event;
  createNamecard: Namecard;
  createTeam: Team;
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
};


export type MutationAddCommentArgs = {
  comment: Scalars['String'];
  teamId: Scalars['String'];
};


export type MutationAddNamecardArgs = {
  namecardId: Scalars['ID'];
};


export type MutationCreateEventArgs = {
  name: Scalars['String'];
};


export type MutationCreateNamecardArgs = {
  input?: Maybe<CreateNamecardInput>;
};


export type MutationCreateTeamArgs = {
  eventId: Scalars['ID'];
  name: Scalars['String'];
  product: ProductInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Namecard = {
  __typename?: 'Namecard';
  event?: Maybe<Event>;
  id: Scalars['ID'];
  memberOf?: Maybe<Affiliation>;
  preferTechnologies?: Maybe<Array<Technology>>;
  product?: Maybe<Product>;
  team?: Maybe<Team>;
  usedTechnologies?: Maybe<Array<Technology>>;
};

export type Product = {
  __typename?: 'Product';
  comments?: Maybe<Array<Comment>>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
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
  getUser?: Maybe<User>;
  listAffiliation?: Maybe<Array<Maybe<Affiliation>>>;
  listEvent?: Maybe<Array<Maybe<Event>>>;
  listTeam?: Maybe<Array<Maybe<Team>>>;
  listTechnology?: Maybe<Array<Maybe<Technology>>>;
};


export type QueryGetUserArgs = {
  userid: Scalars['ID'];
};


export type QueryListTeamArgs = {
  eventID: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onAddedNamecard: User;
};


export type SubscriptionOnAddedNamecardArgs = {
  namecardId: Scalars['ID'];
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
  Affiliation: ResolverTypeWrapper<Affiliation>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  CreateNamecardInput: CreateNamecardInput;
  CreateUserInput: CreateUserInput;
  DeleteUserInput: DeleteUserInput;
  Event: ResolverTypeWrapper<Event>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
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
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Affiliation: Affiliation;
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  CreateNamecardInput: CreateNamecardInput;
  CreateUserInput: CreateUserInput;
  DeleteUserInput: DeleteUserInput;
  Event: Event;
  ID: Scalars['ID'];
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
  addComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationAddCommentArgs, 'comment' | 'teamId'>>;
  addNamecard?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAddNamecardArgs, 'namecardId'>>;
  createEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<MutationCreateEventArgs, 'name'>>;
  createNamecard?: Resolver<ResolversTypes['Namecard'], ParentType, ContextType, RequireFields<MutationCreateNamecardArgs, never>>;
  createTeam?: Resolver<ResolversTypes['Team'], ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'eventId' | 'name' | 'product'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
};

export type NamecardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Namecard'] = ResolversParentTypes['Namecard']> = {
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  memberOf?: Resolver<Maybe<ResolversTypes['Affiliation']>, ParentType, ContextType>;
  preferTechnologies?: Resolver<Maybe<Array<ResolversTypes['Technology']>>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  team?: Resolver<Maybe<ResolversTypes['Team']>, ParentType, ContextType>;
  usedTechnologies?: Resolver<Maybe<Array<ResolversTypes['Technology']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  repository?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'userid'>>;
  listAffiliation?: Resolver<Maybe<Array<Maybe<ResolversTypes['Affiliation']>>>, ParentType, ContextType>;
  listEvent?: Resolver<Maybe<Array<Maybe<ResolversTypes['Event']>>>, ParentType, ContextType>;
  listTeam?: Resolver<Maybe<Array<Maybe<ResolversTypes['Team']>>>, ParentType, ContextType, RequireFields<QueryListTeamArgs, 'eventID'>>;
  listTechnology?: Resolver<Maybe<Array<Maybe<ResolversTypes['Technology']>>>, ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  onAddedNamecard?: SubscriptionResolver<ResolversTypes['User'], "onAddedNamecard", ParentType, ContextType, RequireFields<SubscriptionOnAddedNamecardArgs, 'namecardId'>>;
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

export type Resolvers<ContextType = any> = {
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
};

