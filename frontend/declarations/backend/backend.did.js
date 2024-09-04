export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addErrorMessage' : IDL.Func([IDL.Text], [], []),
    'clearErrorMessages' : IDL.Func([], [], []),
    'getErrorCount' : IDL.Func([], [IDL.Nat], ['query']),
    'getErrorMessages' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
