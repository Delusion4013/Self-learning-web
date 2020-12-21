from gym.envs.register import register
register(
    id='Webapp',
    entry_point='gym_envs.envs:CustomEnv',
    #Made max episode one as the rl model will not be make multiple actions
    max_episodes_steps=1,
)