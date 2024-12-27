from gym.envs.registration import register
register(
    id='Webapp-v0',
    entry_point='gym_envs.envs:CustomEnv',
    #Made max episode one as the rl model will not be make multiple actions
    max_episode_steps=1,
)